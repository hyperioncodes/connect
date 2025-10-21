type notificationsObject = {
    message:string,
    type:"chat"|"req"|"alert"|"pa"|"rem",
    id?:string,
    from:string
}
export default notificationsObject