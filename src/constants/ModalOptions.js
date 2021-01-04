import { theme } from './StyledComponentsTheme';

export const modalOptions = {
    headerShown: false,
    cardStyle: { backgroundColor: theme.$opaqueBackgroundColor },
    cardOverlayEnabled: true,
    cardStyleInterpolator: ({ current: { progress } }) => ({
        overlayStyle: {
            opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.6],
                extrapolate: "clamp"
            })
        }
    })
};