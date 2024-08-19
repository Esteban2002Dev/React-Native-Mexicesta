import { StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

interface Props {
    width: number;
    height: number;
    strokeWidth: string;
    stroke: string;
}
export function WavyLine({ width, height, strokeWidth, stroke }: Props) {
    return(
        <Svg height={height} width={width} style={styles.overlay}>
            <Path
                d={`M0 ${height / 5}
                Q${width / 10} ${height / 3}
                ${width / 5} ${height / 4}
                T${2 * width / 5} ${height / 3}
                T${width / 2} ${height / 4}
                T${3 * width / 5} ${height / 3}
                T${4 * width / 5} ${height / 4}
                T${width} ${height / 3}`}
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
        opacity: .8,
    },
});
