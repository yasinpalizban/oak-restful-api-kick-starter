import FormData from 'form-data';
import fetch from 'isomorphic-fetch';
export class Sms {
    username;
    password;
    phoneNumber;
    constructor(username, password, phoneNumber) {
        this.username = username;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }
    async isActivationCodeValid(mobileNumber, code) {
        const form = new FormData();
        form.append('Username', this.username);
        form.append('Password', this.password);
        form.append('Mobile', mobileNumber);
        form.append('Code', code);
        const url = 'http://smspanel.Trez.ir/CheckSendCode.ashx';
        const resultResponse = await fetch(url, {
            method: 'POST',
            body: form,
        });
        return await resultResponse.json();
    }
    async sendActivationCode(mobileNumber, footer) {
        const form = new FormData();
        form.append('Username', this.username);
        form.append('Password', this.password);
        form.append('Mobile', mobileNumber);
        form.append('Footer', footer);
        const url = 'http://smspanel.Trez.ir/AutoSendCode.ashx';
        const resultResponse = await fetch(url, {
            method: 'POST',
            body: form,
        });
        return await resultResponse.json();
    }
    async sendCustomSms(mobileNumber, message) {
        const form = new FormData();
        form.append('Username', this.username);
        form.append('Password', this.password);
        form.append('Mobile', mobileNumber);
        form.append('Message', message);
        const url = 'http://smspanel.Trez.ir/SendMessageWithCode.ashx';
        const resultResponse = await fetch(url, {
            method: 'POST',
            body: form,
        });
        return await resultResponse.json();
    }
    async sendSms(message, receive, sms) {
        const form = new FormData();
        form.append('Username', this.username);
        form.append('Password', this.password);
        form.append('PhoneNumber', this.phoneNumber);
        form.append('Message', message);
        form.append('RecNumber', receive);
        form.append('Smsclass', sms);
        const url = 'http://smspanel.Trez.ir/SendMessageWithPost.ashx';
        const resultResponse = await fetch(url, {
            method: 'POST',
            body: form,
        });
        return await resultResponse.json();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic21zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUNqQyxPQUFPLEtBQUssTUFBTSxrQkFBa0IsQ0FBQztBQUVyQyxNQUFNLE9BQU8sR0FBRztJQUNNO0lBQTBCO0lBQTBCO0lBQXhFLFlBQW9CLFFBQWdCLEVBQVUsUUFBZ0IsRUFBVSxXQUFtQjtRQUF2RSxhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFRO0lBQUcsQ0FBQztJQUUvRixLQUFLLENBQUMscUJBQXFCLENBQUMsWUFBb0IsRUFBRSxJQUFZO1FBQzVELE1BQU0sSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUxQixNQUFNLEdBQUcsR0FBRyw0Q0FBNEMsQ0FBQztRQUN6RCxNQUFNLGNBQWMsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDdEMsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUMsQ0FBQztRQUVILE9BQU8sTUFBTSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxZQUFvQixFQUFFLE1BQWM7UUFDM0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTlCLE1BQU0sR0FBRyxHQUFHLDJDQUEyQyxDQUFDO1FBQ3hELE1BQU0sY0FBYyxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUN0QyxNQUFNLEVBQUUsTUFBTTtZQUNkLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxZQUFvQixFQUFFLE9BQWU7UUFDdkQsTUFBTSxJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sR0FBRyxHQUFHLGtEQUFrRCxDQUFDO1FBRS9ELE1BQU0sY0FBYyxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUN0QyxNQUFNLEVBQUUsTUFBTTtZQUNkLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQyxDQUFDO1FBRUgsT0FBTyxNQUFNLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFlLEVBQUUsT0FBZSxFQUFFLEdBQVc7UUFDekQsTUFBTSxJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUU3QixNQUFNLEdBQUcsR0FBRyxrREFBa0QsQ0FBQztRQUMvRCxNQUFNLGNBQWMsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDdEMsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUMsQ0FBQztRQUVILE9BQU8sTUFBTSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckMsQ0FBQztDQUNGIn0=