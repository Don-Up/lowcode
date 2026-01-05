export interface CreatePageDto {
  accountId: number;
  pageName: string;
  tdk?: string;
  desc?: string;
  components: any[];
}


export interface PageDto {
  id: number;
  accountId: number;
  pageName: string;
  tdk?: string;
  desc?: string;
  components: any[];
}