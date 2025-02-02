let hasInternetConnection = null;
const express = require("express");
const path = require("path");
require("dotenv").config({
    encoding: "utf8", debug: false, override: false
});
const cors = require("cors");
const networkPing = require("./scripts/network-ping.js");
const http = require("http");
const {Server} = require("socket.io");
const app = express();
let mainSocket = null;
let networkPingCursor = 0;
let mainNetworkCheckerInterval = null;
const PORT = process !== undefined ? process.env !== undefined ? process.env.PORT !== undefined ? process.env.PORT : process.env.ALTERNATIVE_PORT : 3000 : 3000;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        allowedOrigins: ["https://techbrocode.github.io"],
        credentials: true,
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]
    }, connectionStateRecovery: {}
});

app.set("trust-proxy", true);
app.use(express.static(path.join(__dirname, "../client")));
app.use(cors({
    allowedOrigins: ["https://techbrocode.github.io"],
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

function checkNetworkRecursively() {
    mainNetworkCheckerInterval = setInterval(async () => {
        if (mainSocket !== undefined && mainSocket !== null) {
            console.log("Ping url length => ", networkPing.length);
            if (networkPingCursor === (networkPing.length)) {
                networkPingCursor = 0;
            }
            let pingUrl;
            try {
                pingUrl = networkPing[networkPingCursor]?.url;
            } catch (error) {
                console.error(error);
            } finally {
                if (pingUrl === undefined) {
                    pingUrl = "https://www.facebook.com";
                    networkPingCursor = 0;
                }
                console.log(pingUrl);
                try {
                    const axios = require("axios");
                    const response = await axios.head(pingUrl);
                    if (response.status >= 200 && response.status < 300) {
                        hasInternetConnection = true;
                    } else {
                        hasInternetConnection = false;
                    }
                    console.log("Network: ", response.status);
                    if (mainSocket !== null && mainSocket !== undefined) {
                        mainSocket.emit("networkResponse", {
                            status: response.status,
                            value: hasInternetConnection
                        });
                    }
                } catch (e) {
                    hasInternetConnection = false;
                    console.error("Internet Error: ", e);
                    if (mainSocket !== null && mainSocket !== undefined) {
                        mainSocket.emit("networkResponse", {
                            status: 500,
                            value: hasInternetConnection
                        });
                    }
                } finally {
                    networkPingCursor++;
                }
            }
        }
    }, 2000);
}

io.on("connect", async socket => {
    mainSocket = socket;
    hasInternetConnection = false;
    console.log(`User with id ${socket.id} connected...`);
    socket.emit("networkResponse", {
        status: undefined,
        value: false
    });

    if (mainNetworkCheckerInterval === undefined || mainNetworkCheckerInterval === null) {
        //checkNetworkRecursively();
    }

    socket.on("disconnect", async () => {
        mainSocket = null;
        hasInternetConnection = false;
        console.log(`User disconnected with id ${socket.id}...`);
        socket.emit("networkResponse", {
            status: undefined,
            value: false
        });
        if (mainNetworkCheckerInterval !== undefined && mainNetworkCheckerInterval !== null) {
            clearInterval(mainNetworkCheckerInterval);
            mainNetworkCheckerInterval = null;
        }
    });
});

app.all("*", async (req, res) => {
    try {
        res.set("Cache-Control", "no-cache, no-store, must-revalidate");
        res.set("Pragma", "no-cache");
        res.set("Expires", "0");
        res.status(201).sendFile(path.join(__dirname, "../client", "html", "index.html"));
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Internal server error!"
        });
    }
});


server.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
