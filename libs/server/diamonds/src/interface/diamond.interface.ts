/**
 * Diamond Interface
 * @author Bismark Frimpong
 * @date 04/09/2022
 * @version 1.0
 * @copyright DiamondFoundry
 */
export interface DiamondQuery {
  diamondType?: { $in: string[] };
  carat?: { $gte: string; $lte: string };
  cut?: { $in: string[] };
  clarity?: { $in: string[] };
  color?: { $in: string[] };
  shape?: { $in: string[] };
  limit?: number;
  page?: number;
  sortOrder?: string;
  sortBy: string;
}
