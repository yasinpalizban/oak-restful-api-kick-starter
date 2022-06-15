import { Status } from "https://deno.land/x/oak/mod.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
class ApiController {
    async all(context, next) {
        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json");
        context.response.body = {
            statusMessage: i18next.t('api.errors.rest.index'),
        };
    }
    async index(context, next) {
        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json");
        context.response.body = {
            statusMessage: i18next.t('api.errors.rest.index'),
        };
    }
    async show(context, next) {
        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json");
        context.response.body = {
            statusMessage: i18next.t('api.errors.rest.show'),
        };
    }
    async create(context, next) {
        context.response.status = Status.Created;
        context.response.headers.set("Content-Type", "application/json");
        context.response.body = {
            statusMessage: i18next.t('api.errors.rest.create'),
        };
    }
    async update(context, next) {
        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json");
        context.response.body = {
            statusMessage: i18next.t('api.errors.rest.update'),
        };
    }
    async delete(context, next) {
        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json");
        context.response.body = {
            statusMessage: i18next.t('api.errors.rest.delete'),
        };
    }
}
export default ApiController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcGkuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXFCLE1BQU0sRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBRzFFLE9BQU8sT0FBTyxNQUFNLHNDQUFzQyxDQUFDO0FBRTNELE1BQU0sYUFBYTtJQUVmLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBZ0IsRUFBRSxJQUFTO1FBR2pDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDckMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFBO1FBQ2hFLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHO1lBQ3BCLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDO1NBQ3BELENBQUM7SUFDTixDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFnQixFQUFFLElBQVM7UUFFbkMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNwQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUE7UUFDaEUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUc7WUFDcEIsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUM7U0FDcEQsQ0FBQztJQUNOLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQWdCLEVBQUUsSUFBUztRQUVsQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQTtRQUNoRSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRztZQUNwQixhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQztTQUNuRCxDQUFDO0lBQ04sQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBZ0IsRUFBRSxJQUFTO1FBRXBDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDekMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFBO1FBQ2hFLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHO1lBQ3BCLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDO1NBQ3JELENBQUM7SUFDTixDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFnQixFQUFFLElBQVM7UUFFcEMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNwQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUE7UUFDaEUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUc7WUFDcEIsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUM7U0FDckQsQ0FBQztJQUNOLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQWdCLEVBQUUsSUFBUztRQUVwQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQTtRQUNoRSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRztZQUNwQixhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQztTQUNyRCxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsZUFBZSxhQUFhLENBQUMifQ==