
export enum SortBy {
  DIAMONDTYPE = "diamondType",
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
    const MONGO_SORT_TRANSLATE = {
      color: "color_sort",
      cut: "cut_sort",
      clarity: "clarity_sort"
    }
    let sortBy = this.sortBy

    if (this.sortBy in MONGO_SORT_TRANSLATE) {
      sortBy = MONGO_SORT_TRANSLATE[this.sortBy]


    }
    const sortStage = { [sortBy]: this.sortOrder === SortOrder.DESC ? -1 : 1 }

    return sortStage;


  }
}

