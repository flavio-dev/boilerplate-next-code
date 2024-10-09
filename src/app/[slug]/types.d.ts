export type tMix = {
  slug: string;
  name: string;
  tags: ITag[];
  pictures: IMixPicture;
};

export type ITag = {
  name: string;
};

export type IMixPicture = {
  extra_large: string;
};
