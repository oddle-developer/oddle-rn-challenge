import * as Domain from "../../Domain"
import { Device, MasterData, User } from "./types";

var token: string = Domain.REST_API_KEY;
var refreshToken: string = '';
var lang: string = '';
var customServer: string = '';
var connected: boolean = false;
var sendLog: boolean = false;
var master: MasterData = new MasterData();
var user: User = new User();
var device: Device = new Device();
var lastClick: number = 0;
var appAccountName: string = Domain.REST_API_NAME;
var appApiKey: string = Domain.REST_API_KEY;
export default {
    connected,
    sendLog,
    customServer,
    token,
    refreshToken,
    lang,
    master,
    user,
    device,
    lastClick,
    appAccountName,
    appApiKey
}