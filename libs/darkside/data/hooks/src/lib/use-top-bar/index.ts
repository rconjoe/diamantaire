import { queries } from '@diamantaire/darkside/data/queries';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

type TopBarData = {
  announcementBar: {
    loop: boolean;
    data: {
      copy: string;
      link: string;
      shouldShowDynamicBookAnAppointment: boolean;
      enableGeoCopy: string;
      nonGeoCopy: string;
      geoCopy: string;
    }[];
  };
};

export function useTopBar(locale: string): UseQueryResult<TopBarData, unknown> {
  return useQuery({
    ...queries['top-bar'].content(locale),
  });
}

export default useTopBar;
