import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
    d: string,
    width: number;
    height: number;
    strokeWidth: string;
    stroke: string;
}
export function SvgDrawer({ d, width, height, strokeWidth, stroke }: Props) {
    return(
        <Svg height={height} width={width} style={styles.overlay}>
            <Path
                d={d}
                stroke={stroke}
                strokeWidth={strokeWidth}
                fill="none"
            />
        </Svg>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 5,
        left: 0,
        zIndex: 1,
        opacity: .6,
    },
});
