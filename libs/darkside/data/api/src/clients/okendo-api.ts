// Primary use: Fetch Okendo reviews for a product JSON Schema

export type ReviewsResponse = {
  reviews: {
    reviewer: {
      displayName: string;
    };
    dateCreated: string;
    body: string;
    title: string;
    rating: number;
  }[];
  reviewAggregate: {
    reviewCount: number;
    reviewRatingValuesTotal: number;
  };
};

export async function okendoRequest(productId): Promise<ReviewsResponse> {
  // This is a public store ID
  const storeId = `c4c79526-c8cc-4c48-80ec-9ea847c75f69`;

  const reviewsRequest = `https://api.okendo.io/v1/stores/${storeId}/collections/${productId}/reviews`;
  const reviewsAggregateRequest = `https://api.okendo.io/v1/stores/${storeId}/collections/${productId}/review_aggregate`;

  const reviewsResponse = await fetch(reviewsRequest, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  const reviewAggregateResponse = await fetch(reviewsAggregateRequest, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return {
    reviews: reviewsResponse?.reviews,
    reviewAggregate: reviewAggregateResponse?.reviewAggregate,
  };
}
