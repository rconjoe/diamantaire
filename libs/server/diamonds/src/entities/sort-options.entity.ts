
const DIAMOND_PROPERTY_ORDERS = {
  cut: ['Excellent', 'Ideal', 'Ideal+Hearts'],
  color: ['L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D'],
  clarity: ['SI2', 'SI1', 'VS2', 'VS1', 'VVS2', 'VVS1'],
}

export enum SortBy {
  SHAPE = "shape",
  CARAT = "carat",
  COLOR = "color",
  CLARITY = "clarity",
  CUT = "cut",
  PRICE = "price"

}
export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export class SortOption {
  sortBy: SortBy
  sortOrder: SortOrder

  constructor(sortBy: SortBy, sortOrder: SortOrder) {
    this.sortBy = sortBy;
    this.sortOrder = sortOrder

  }

  ToMongo() {

    if (this.sortBy in DIAMOND_PROPERTY_ORDERS) {
      const addFieldStage =  { [`${this.sortBy}_order`]: { $indexOfArray: [DIAMOND_PROPERTY_ORDERS[this.sortBy], `$${this.sortBy}`] } };
      const sortStage ={ [`${this.sortBy}_order`]: this.sortOrder === SortOrder.DESC ? -1 : 1 };

      return [addFieldStage, sortStage]
    } else {
      const sortStage = { [this.sortBy]: this.sortOrder === SortOrder.DESC ? -1 : 1 }

      return [null, sortStage];
    }

  }
}

