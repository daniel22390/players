import { CardStyleInterpolators, HeaderStyleInterpolators } from '@react-navigation/stack';

export const navigatorOptions = {
    cardStyle: { backgroundColor: 'transparent' },
    headerStyleInterpolator: HeaderStyleInterpolators.forStatic,
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
}