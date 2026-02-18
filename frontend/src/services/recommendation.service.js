// getRecommendations.js

const getRecommendations = (
  formData = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  },
  products = []
) => {
  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType,
  } = formData;

  const scoredProducts = products.map((product, index) => {
    let score = 0;

    selectedPreferences.forEach((pref) => {
      if (product.preferences?.includes(pref)) {
        score++;
      }
    });

    selectedFeatures.forEach((feature) => {
      if (product.features?.includes(feature)) {
        score++;
      }
    });

    return {
      ...product,
      score,
      index,
    };
  });

  const sorted = scoredProducts.sort((a, b) => {
    if (b.score === a.score) {
      return b.index - a.index;
    }
    return b.score - a.score;
  });

  if (selectedRecommendationType === 'SingleProduct') {
    const best = sorted.find((p) => p.score > 0);
    return best ? [best] : [];
  }

  if (selectedRecommendationType === 'MultipleProducts') {
    return sorted.filter((p) => p.score > 0);
  }

  return [];
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getRecommendations };
