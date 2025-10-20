type notificationsObject = {
    message:string,
    type:"chat"|"req"|"alert"|"pa"|"rem",
    id?:string,
    time:string
}
export default notificationsObject