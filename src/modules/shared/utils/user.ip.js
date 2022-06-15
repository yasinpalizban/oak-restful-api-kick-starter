export function userIp(req) {
    let ip;
    if (req.headers['x-forwarded-for']) {
        // ip = req.headers["x-forwarded-for"].split(",")[0];
    }
    else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    }
    else {
        ip = req.ip;
    }
    return ip;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5pcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIuaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxVQUFVLE1BQU0sQ0FBQyxHQUFZO0lBQ2pDLElBQUksRUFBVSxDQUFDO0lBRWYsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFDbEMscURBQXFEO0tBQ3REO1NBQU0sSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFO1FBQ3pELEVBQUUsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztLQUNuQztTQUFNO1FBQ0wsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUM7S0FDYjtJQUNELE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQyJ9