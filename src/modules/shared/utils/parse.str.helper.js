import { SearchFunctionType } from '../enum/search.function';
import { Op } from 'sequelize';
export function convertSignType(sign, value) {
    switch (sign) {
        case '!=':
            return { [Op.ne]: value };
        case '>':
            return { [Op.gt]: value };
        case '=>':
            return { [Op.gte]: value };
        case '<':
            return { [Op.lt]: value };
        case '=<':
            return { [Op.lte]: value };
        default:
            return { [Op.eq]: value };
    }
}
export function convertFunctionType(name) {
    switch (name) {
        case 'orWhere':
            return SearchFunctionType.orWhere;
        case 'whereNotIn':
            return SearchFunctionType.whereNoTIn;
        case 'whereIn':
            return SearchFunctionType.whereIn;
        case 'like':
            return SearchFunctionType.like;
        default:
            return SearchFunctionType.where;
    }
}
export function parseString(str) {
    // %
    while (true) {
        str = decodeURIComponent(str);
        if (str.indexOf('%') == -1) {
            break;
        }
    }
    return str;
}
export function changeKeyObject(obj, oldKey, newKey) {
    return JSON.parse(JSON.stringify(obj).split(oldKey).join(newKey));
}
export function comparePipeLine(key, pipeline, defaultPipeLine) {
    pipeline.forEach(p => {
        if (p[key]) {
            defaultPipeLine.forEach(dp => {
                if (dp[key]) {
                }
            });
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2Uuc3RyLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhcnNlLnN0ci5oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFN0QsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMvQixNQUFNLFVBQVUsZUFBZSxDQUFDLElBQXVCLEVBQUUsS0FBNEM7SUFDbkcsUUFBUSxJQUFJLEVBQUU7UUFDWixLQUFLLElBQUk7WUFDUCxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDNUIsS0FBSyxHQUFHO1lBQ04sT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQzVCLEtBQUssSUFBSTtZQUNQLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUM3QixLQUFLLEdBQUc7WUFDTixPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDNUIsS0FBSyxJQUFJO1lBQ1AsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQzdCO1lBQ0UsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO0tBQzdCO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxJQUFZO0lBQzlDLFFBQVEsSUFBSSxFQUFFO1FBQ1osS0FBSyxTQUFTO1lBQ1osT0FBTyxrQkFBa0IsQ0FBQyxPQUFPLENBQUM7UUFDcEMsS0FBSyxZQUFZO1lBQ2YsT0FBTyxrQkFBa0IsQ0FBQyxVQUFVLENBQUM7UUFDdkMsS0FBSyxTQUFTO1lBQ1osT0FBTyxrQkFBa0IsQ0FBQyxPQUFPLENBQUM7UUFDcEMsS0FBSyxNQUFNO1lBQ1QsT0FBTyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7UUFDakM7WUFDRSxPQUFPLGtCQUFrQixDQUFDLEtBQUssQ0FBQztLQUNuQztBQUNILENBQUM7QUFFRCxNQUFNLFVBQVUsV0FBVyxDQUFDLEdBQVc7SUFDckMsSUFBSTtJQUNKLE9BQU8sSUFBSSxFQUFFO1FBQ1gsR0FBRyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUMxQixNQUFNO1NBQ1A7S0FDRjtJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVELE1BQU0sVUFBVSxlQUFlLENBQUMsR0FBVyxFQUFFLE1BQWMsRUFBRSxNQUFjO0lBQ3pFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNwRSxDQUFDO0FBRUQsTUFBTSxVQUFVLGVBQWUsQ0FBQyxHQUFXLEVBQUUsUUFBNkIsRUFBRSxlQUFvQztJQUM5RyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ25CLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ1YsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUU7aUJBQ1o7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIn0=