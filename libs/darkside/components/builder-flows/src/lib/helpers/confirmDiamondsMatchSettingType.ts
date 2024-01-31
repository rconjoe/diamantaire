export function confirmDiamondsMatchSettingType(diamonds, product, router) {
  // Custom products with a single diamond
  if (diamonds.length === 1) {
    if (diamonds?.[0]?.diamondType !== product?.configuration?.diamondType) {
      console.log('diamonds dont match', {
        diamond: diamonds?.[0]?.diamondType,
        setting: product?.configuration?.diamondType,
      });

      const newProductSlug = product?.optionConfigs?.diamondType.find((type) => type.value === diamonds?.[0]?.diamondType);

      console.log('newProductSlug', newProductSlug);

      if (router?.query?.flowType === 'setting-to-diamond') {
        // router.replace(
        //   `/customize/setting-to-diamond/summary/${settingSlugs.collectionSlug}/${newProductSlug?.id}/${diamonds?.[0]?.lotId}`,
        //   null,
        //   { shallow: true },
        // );
      } else {
        router.replace(
          `/customize/diamond-to-setting/${diamonds?.[0]?.lotId}/${router?.query?.collectionSlug}/${newProductSlug?.id}/summary`,
          null,
          { shallow: true },
        );
      }

      // return updateSettingSlugs({
      //   productSlug: newProductSlug?.id,
      // });
    }
  } else if (diamonds.length > 1) {
    // if (diamonds.filter((diamond) => diamond.diamondType !== product?.configuration?.diamondType).length > 0) {
    //   console.log('diamonds dont match', {
    //     diamond: diamonds?.[0]?.diamondType,
    //     setting: product?.configuration?.diamondType,
    //   });
    //   if (router.asPath.includes('/pair')) {
    //     const newProductSlug = product?.optionConfigs?.diamondType.find((type) => type.value === diamonds?.[0]?.diamondType);
    //     if (router?.query?.flowType === 'setting-to-diamond') {
    //       router.push(
    //         `/customize/setting-to-diamond/summary/${settingSlugs.collectionSlug}/${newProductSlug?.id}/${diamonds?.[0]?.lotId}`,
    //         null,
    //         { shallow: true },
    //       );
    //     }
    //     // return updateSettingSlugs({
    //     //   productSlug: newProductSlug?.id,
    //     // });
    //   }
    // }
  }

  // removeURLParams(router);
}

// function removeURLParams(router) {
//   const currentUrl = window.location.href;
//   const urlWithoutSearchParams = currentUrl.split('?')[0];

//   router.replace(urlWithoutSearchParams);
// }
