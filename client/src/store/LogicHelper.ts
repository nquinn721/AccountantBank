import moment from "moment";

export class LogicHelper {
  static GetAllAmounts(items: any[]) {
    const itemsPerDate = this.GetAllItemsPerDate(items);
    const allItems = Object.values(itemsPerDate);
    return allItems.map((item) => {
      return (item as number[]).reduce((acc, amount) => acc + amount, 0);
    });
  }

  static GetAllDates(items: any[]) {
    return items
      .map((item) => moment(item.created_at).format("MM/DD/YYYY"))
      .reduce((acc, date) => {
        if (!acc.includes(date)) {
          acc.push(date);
        }
        return acc;
      }, [] as string[]);
  }

  static GetAllItemsPerDate(items: any[]) {
    return items.reduce((acc, item) => {
      const date = moment(item.created_at).format("MM/DD/YYYY");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item.amount);
      return acc;
    }, {} as { [key: string]: number[] });
  }
}
