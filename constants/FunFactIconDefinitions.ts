type FunFactMaterialIconName =
  | 'smartphone'
  | 'computer'
  | 'settings'
  | 'cloud'
  | 'public'
  | 'storage'
  | 'build'
  | 'videogame-asset'
  | 'snowboarding'
  | 'grass';
type FunFactCommunityIconName = 
    'weight-lifter'
    |'heart';

type FunFactFoundationIconName = 
    'mountains'
    |'music';
type MaterialIconItem = {
    title: string;
    iconType: 'MaterialIcons';
    icon: FunFactMaterialIconName;
}

type MaterialCommunityIconItem = {
    title: string;
    iconType: 'MaterialCommunityIcons';
    icon: FunFactCommunityIconName;
}

type FoundationIconItem = {
    title: string;
    iconType: 'Foundation';
    icon: FunFactFoundationIconName;
}

export type FunFactItem = MaterialIconItem | MaterialCommunityIconItem | FoundationIconItem;
