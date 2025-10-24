type notificationsObject = {
    message:string,
    type:"chat"|"calendar",
    id?:string,
    from:string,
    routeTo:string
}
export default notificationsObject