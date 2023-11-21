import { queries } from '@diamantaire/darkside/data/queries';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

type TopBarData = {
  announcementBar: {
    loop: boolean;
    data: {
      copy: string;
      nonGeoCopy: string;
      geoCopy: string;
      enableGeoCopy: boolean;
      link: string;
      shouldShowDynamicBookAnAppointment: boolean;
      enableGwp: boolean;
      supportedCountries: {
        code: string;
        name: string;
      }[];
    }[];
  };
};

export function useTopBar(locale: string): UseQueryResult<TopBarData, unknown> {
  return useQuery({
    ...queries['top-bar'].content(locale),
  });
}

export default useTopBar;
