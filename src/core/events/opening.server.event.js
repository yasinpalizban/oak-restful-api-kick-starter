const openingServeEvent = (event) => {
    const item = event;
    console.log(`Listening on: ${item.secure ? "https://" : "http://"}${item.hostname ??
        "localhost"}:${item.port}`);
};
export default openingServeEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlbmluZy5zZXJ2ZXIuZXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvcGVuaW5nLnNlcnZlci5ldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLGlCQUFpQixHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUU7SUFDckMsTUFBTSxJQUFJLEdBQW1CLEtBQUssQ0FBQztJQUNuQyxPQUFPLENBQUMsR0FBRyxDQUNQLGlCQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FDakQsSUFBSSxDQUFDLFFBQVE7UUFDYixXQUNKLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUNsQixDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBRUYsZUFBZSxpQkFBaUIsQ0FBQyJ9