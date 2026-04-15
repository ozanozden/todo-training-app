export enum TextVariant {
  BODY = 'body',
  TITLE1 = 'title1',
  TITLE2 = 'title2',
  TITLE3 = 'title3',
  CAPTION = 'caption',
  OVERLINE = 'overline',
}

export enum TextTag {
  P = 'p',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  SPAN = 'span',
}

export interface TextProps {
  variant?: TextVariant;
  tag?: TextTag;
  className?: string;
  children: React.ReactNode;
}
