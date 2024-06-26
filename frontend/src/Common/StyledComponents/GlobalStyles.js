import { createGlobalStyle } from "styled-components";
import careerBgImg from "../../Images/careers-bg.jpg";

export const GlobalStyles = createGlobalStyle`


* {
    margin:0;
    padding: 0;
}

ul, li {
    margin: 0;
    padding:0;
    // list-style: none;
}

a {text-decoration: none}

h1, h2, h3, h4, h5, h6 {
    font-family: Poppins;
}

body {
    font-family: ${({ theme }) => theme.fontFamily};
    background-color: ${({ theme }) => theme.background};
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='1000' preserveAspectRatio='none' viewBox='0 0 1440 1000'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1015%26quot%3b)' fill='none'%3e%3cpath d='M82.46 82.47L134.43 112.47L134.43 172.47L82.46 202.47L30.5 172.47L30.5 112.47zM82.46 442.47L134.43 472.47L134.43 532.47L82.46 562.47L30.5 532.47L30.5 472.47zM186.39 442.47L238.35 472.47L238.35 532.47L186.39 562.47L134.43 532.47L134.43 472.47zM186.39 802.47L238.35 832.47L238.35 892.47L186.39 922.47L134.43 892.47L134.43 832.47zM238.35 352.47L290.31 382.47L290.31 442.47L238.35 472.47L186.39 442.47L186.39 382.47zM342.28 -7.53L394.24 22.47L394.24 82.47L342.28 112.47L290.31 82.47L290.31 22.47zM394.24 262.47L446.2 292.47L446.2 352.47L394.24 382.47L342.28 352.47L342.28 292.47zM342.28 892.47L394.24 922.47L394.24 982.47L342.28 1012.47L290.31 982.47L290.31 922.47zM498.17 82.47L550.13 112.47L550.13 172.47L498.17 202.47L446.2 172.47L446.2 112.47zM498.17 442.47L550.13 472.47L550.13 532.47L498.17 562.47L446.2 532.47L446.2 472.47zM602.09 82.47L654.06 112.47L654.06 172.47L602.09 202.47L550.13 172.47L550.13 112.47zM602.09 442.47L654.06 472.47L654.06 532.47L602.09 562.47L550.13 532.47L550.13 472.47zM550.13 532.47L602.09 562.47L602.09 622.47L550.13 652.47L498.17 622.47L498.17 562.47zM654.06 -7.53L706.02 22.47L706.02 82.47L654.06 112.47L602.09 82.47L602.09 22.47zM654.06 532.47L706.02 562.47L706.02 622.47L654.06 652.47L602.09 622.47L602.09 562.47zM809.94 262.47L861.91 292.47L861.91 352.47L809.94 382.47L757.98 352.47L757.98 292.47zM809.94 802.47L861.91 832.47L861.91 892.47L809.94 922.47L757.98 892.47L757.98 832.47zM757.98 892.47L809.94 922.47L809.94 982.47L757.98 1012.47L706.02 982.47L706.02 922.47zM861.91 -7.53L913.87 22.47L913.87 82.47L861.91 112.47L809.95 82.47L809.95 22.47zM913.87 82.47L965.83 112.47L965.83 172.47L913.87 202.47L861.91 172.47L861.91 112.47zM861.91 352.47L913.87 382.47L913.87 442.47L861.91 472.47L809.95 442.47L809.95 382.47zM913.87 442.47L965.83 472.47L965.83 532.47L913.87 562.47L861.91 532.47L861.91 472.47zM913.87 802.47L965.83 832.47L965.83 892.47L913.87 922.47L861.91 892.47L861.91 832.47zM965.83 -7.53L1017.8 22.47L1017.8 82.47L965.83 112.47L913.87 82.47L913.87 22.47zM965.83 352.47L1017.8 382.47L1017.8 442.47L965.83 472.47L913.87 442.47L913.87 382.47zM1069.76 -7.53L1121.72 22.47L1121.72 82.47L1069.76 112.47L1017.8 82.47L1017.8 22.47zM1069.76 172.47L1121.72 202.47L1121.72 262.47L1069.76 292.47L1017.8 262.47L1017.8 202.47zM1121.72 442.47L1173.69 472.47L1173.69 532.47L1121.72 562.47L1069.76 532.47L1069.76 472.47zM1121.72 622.47L1173.69 652.47L1173.69 712.47L1121.72 742.47L1069.76 712.47L1069.76 652.47zM1225.65 262.47L1277.61 292.47L1277.61 352.47L1225.65 382.47L1173.69 352.47L1173.69 292.47zM1329.58 262.47L1381.54 292.47L1381.54 352.47L1329.58 382.47L1277.61 352.47L1277.61 292.47zM1329.58 982.47L1381.54 1012.47L1381.54 1072.47L1329.58 1102.47L1277.61 1072.47L1277.61 1012.47zM1433.5 82.47L1485.46 112.47L1485.46 172.47L1433.5 202.47L1381.54 172.47L1381.54 112.47zM1433.5 262.47L1485.46 292.47L1485.46 352.47L1433.5 382.47L1381.54 352.47L1381.54 292.47zM1381.54 352.47L1433.5 382.47L1433.5 442.47L1381.54 472.47L1329.58 442.47L1329.58 382.47z' stroke='rgba(205%2c 227%2c 244%2c 0.9)' stroke-width='2'%3e%3c/path%3e%3cpath d='M76.46 82.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM128.43 112.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM128.43 172.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM76.46 202.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM24.5 172.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM24.5 112.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM76.46 442.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM128.43 472.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM128.43 532.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM76.46 562.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM24.5 532.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM24.5 472.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM180.39 442.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM232.35 472.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM232.35 532.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM180.39 562.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM180.39 802.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM232.35 832.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM232.35 892.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM180.39 922.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM128.43 892.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM128.43 832.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM232.35 352.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM284.31 382.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM284.31 442.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM180.39 382.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM336.28 -7.53 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM388.24 22.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM388.24 82.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM336.28 112.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM284.31 82.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM284.31 22.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM388.24 262.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM440.2 292.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM440.2 352.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM388.24 382.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM336.28 352.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM336.28 292.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM336.28 892.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM388.24 922.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM388.24 982.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM336.28 1012.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM284.31 982.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM284.31 922.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM492.17 82.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM544.13 112.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM544.13 172.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM492.17 202.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM440.2 172.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM440.2 112.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM492.17 442.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM544.13 472.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM544.13 532.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM492.17 562.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM440.2 532.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM440.2 472.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM596.09 82.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM648.06 112.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM648.06 172.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM596.09 202.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM596.09 442.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM648.06 472.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM648.06 532.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM596.09 562.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM596.09 622.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM544.13 652.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM492.17 622.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM648.06 -7.53 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM700.02 22.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM700.02 82.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM596.09 22.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM700.02 562.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM700.02 622.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM648.06 652.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM803.94 262.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM855.91 292.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM855.91 352.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM803.94 382.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM751.98 352.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM751.98 292.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM803.94 802.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM855.91 832.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM855.91 892.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM803.94 922.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM751.98 892.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM751.98 832.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM803.94 982.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM751.98 1012.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM700.02 982.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM700.02 922.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM855.91 -7.53 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM907.87 22.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM907.87 82.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM855.91 112.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM803.95 82.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM803.95 22.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM959.83 112.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM959.83 172.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM907.87 202.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM855.91 172.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM907.87 382.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM907.87 442.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM855.91 472.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM803.95 442.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM803.95 382.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM959.83 472.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM959.83 532.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM907.87 562.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM855.91 532.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM907.87 802.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM959.83 832.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM959.83 892.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM907.87 922.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM959.83 -7.53 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1011.8 22.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1011.8 82.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM959.83 352.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1011.8 382.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1011.8 442.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1063.76 -7.53 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1115.72 22.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1115.72 82.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1063.76 112.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1063.76 172.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1115.72 202.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1115.72 262.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1063.76 292.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1011.8 262.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1011.8 202.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1115.72 442.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1167.69 472.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1167.69 532.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1115.72 562.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1063.76 532.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1063.76 472.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1115.72 622.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1167.69 652.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1167.69 712.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1115.72 742.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1063.76 712.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1063.76 652.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1219.65 262.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1271.61 292.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1271.61 352.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1219.65 382.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1167.69 352.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1167.69 292.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1323.58 262.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1375.54 292.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1375.54 352.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1323.58 382.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1323.58 982.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1375.54 1012.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1375.54 1072.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1323.58 1102.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1271.61 1072.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1271.61 1012.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1427.5 82.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1479.46 112.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1479.46 172.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1427.5 202.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1375.54 172.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1375.54 112.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1427.5 262.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1479.46 292.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1479.46 352.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1427.5 382.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1427.5 442.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1375.54 472.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0zM1323.58 442.47 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0z' fill='rgba(205%2c 227%2c 244%2c 0.9)'%3e%3c/path%3e%3cpath d='M54.8 696.13L100.7 722.63L100.7 775.63L54.8 802.13L8.9 775.63L8.9 722.63zM8.9 775.63L54.8 802.13L54.8 855.13L8.9 881.63L-37 855.13L-37 802.13zM100.7 298.63L146.6 325.13L146.6 378.13L100.7 404.63L54.8 378.13L54.8 325.13zM146.6 378.13L192.5 404.63L192.5 457.63L146.6 484.13L100.7 457.63L100.7 404.63zM146.6 696.13L192.5 722.63L192.5 775.63L146.6 802.13L100.7 775.63L100.7 722.63zM238.4 60.13L284.3 86.63L284.3 139.63L238.4 166.13L192.5 139.63L192.5 86.63zM192.5 139.63L238.4 166.13L238.4 219.13L192.5 245.63L146.6 219.13L146.6 166.13zM192.5 298.63L238.4 325.13L238.4 378.13L192.5 404.63L146.6 378.13L146.6 325.13zM238.4 696.13L284.3 722.63L284.3 775.63L238.4 802.13L192.5 775.63L192.5 722.63zM330.2 219.13L376.11 245.63L376.11 298.63L330.2 325.13L284.3 298.63L284.3 245.63zM330.2 537.13L376.11 563.63L376.11 616.63L330.2 643.13L284.3 616.63L284.3 563.63zM330.2 696.13L376.11 722.63L376.11 775.63L330.2 802.13L284.3 775.63L284.3 722.63zM284.3 934.63L330.2 961.13L330.2 1014.13L284.3 1040.63L238.4 1014.13L238.4 961.13zM422.01 219.13L467.91 245.63L467.91 298.63L422.01 325.13L376.11 298.63L376.11 245.63zM376.11 457.63L422.01 484.13L422.01 537.13L376.11 563.63L330.2 537.13L330.2 484.13zM376.11 616.63L422.01 643.13L422.01 696.13L376.11 722.63L330.2 696.13L330.2 643.13zM376.11 775.63L422.01 802.13L422.01 855.13L376.11 881.63L330.2 855.13L330.2 802.13zM376.11 934.63L422.01 961.13L422.01 1014.13L376.11 1040.63L330.2 1014.13L330.2 961.13zM422.01 1014.13L467.91 1040.63L467.91 1093.63L422.01 1120.13L376.11 1093.63L376.11 1040.63zM467.91 139.63L513.81 166.13L513.81 219.13L467.91 245.63L422.01 219.13L422.01 166.13zM513.81 696.13L559.71 722.63L559.71 775.63L513.81 802.13L467.91 775.63L467.91 722.63zM513.81 855.13L559.71 881.63L559.71 934.63L513.81 961.13L467.91 934.63L467.91 881.63zM467.91 934.63L513.81 961.13L513.81 1014.13L467.91 1040.63L422.01 1014.13L422.01 961.13zM513.81 1014.13L559.71 1040.63L559.71 1093.63L513.81 1120.13L467.91 1093.63L467.91 1040.63zM559.71 616.63L605.61 643.13L605.61 696.13L559.71 722.63L513.81 696.13L513.81 643.13zM605.61 1014.13L651.51 1040.63L651.51 1093.63L605.61 1120.13L559.71 1093.63L559.71 1040.63zM651.51 298.63L697.41 325.13L697.41 378.13L651.51 404.63L605.61 378.13L605.61 325.13zM697.41 378.13L743.31 404.63L743.31 457.63L697.41 484.13L651.51 457.63L651.51 404.63zM651.51 457.63L697.41 484.13L697.41 537.13L651.51 563.63L605.61 537.13L605.61 484.13zM697.41 855.13L743.31 881.63L743.31 934.63L697.41 961.13L651.51 934.63L651.51 881.63zM743.31 139.63L789.21 166.13L789.21 219.13L743.31 245.63L697.41 219.13L697.41 166.13zM789.21 378.13L835.11 404.63L835.11 457.63L789.21 484.13L743.31 457.63L743.31 404.63zM835.11 298.63L881.01 325.13L881.01 378.13L835.11 404.63L789.21 378.13L789.21 325.13zM881.01 378.13L926.91 404.63L926.91 457.63L881.01 484.13L835.11 457.63L835.11 404.63zM881.01 855.13L926.91 881.63L926.91 934.63L881.01 961.13L835.11 934.63L835.11 881.63zM881.01 1014.13L926.91 1040.63L926.91 1093.63L881.01 1120.13L835.11 1093.63L835.11 1040.63zM972.81 219.13L1018.71 245.63L1018.71 298.63L972.81 325.13L926.91 298.63L926.91 245.63zM972.81 537.13L1018.71 563.63L1018.71 616.63L972.81 643.13L926.91 616.63L926.91 563.63zM972.81 855.13L1018.71 881.63L1018.71 934.63L972.81 961.13L926.91 934.63L926.91 881.63zM926.91 934.63L972.81 961.13L972.81 1014.13L926.91 1040.63L881.01 1014.13L881.01 961.13zM972.81 1014.13L1018.71 1040.63L1018.71 1093.63L972.81 1120.13L926.91 1093.63L926.91 1040.63zM1018.71 616.63L1064.61 643.13L1064.61 696.13L1018.71 722.63L972.81 696.13L972.81 643.13zM1110.52 775.63L1156.42 802.13L1156.42 855.13L1110.52 881.63L1064.61 855.13L1064.61 802.13zM1110.52 934.63L1156.42 961.13L1156.42 1014.13L1110.52 1040.63L1064.61 1014.13L1064.61 961.13zM1248.22 60.13L1294.12 86.63L1294.12 139.63L1248.22 166.13L1202.32 139.63L1202.32 86.63zM1202.32 139.63L1248.22 166.13L1248.22 219.13L1202.32 245.63L1156.42 219.13L1156.42 166.13zM1202.32 298.63L1248.22 325.13L1248.22 378.13L1202.32 404.63L1156.42 378.13L1156.42 325.13zM1202.32 457.63L1248.22 484.13L1248.22 537.13L1202.32 563.63L1156.42 537.13L1156.42 484.13zM1248.22 696.13L1294.12 722.63L1294.12 775.63L1248.22 802.13L1202.32 775.63L1202.32 722.63zM1202.32 934.63L1248.22 961.13L1248.22 1014.13L1202.32 1040.63L1156.42 1014.13L1156.42 961.13zM1294.12 -19.37L1340.02 7.13L1340.02 60.13L1294.12 86.63L1248.22 60.13L1248.22 7.13zM1340.02 60.13L1385.92 86.63L1385.92 139.63L1340.02 166.13L1294.12 139.63L1294.12 86.63zM1340.02 378.13L1385.92 404.63L1385.92 457.63L1340.02 484.13L1294.12 457.63L1294.12 404.63zM1294.12 616.63L1340.02 643.13L1340.02 696.13L1294.12 722.63L1248.22 696.13L1248.22 643.13zM1294.12 775.63L1340.02 802.13L1340.02 855.13L1294.12 881.63L1248.22 855.13L1248.22 802.13zM1431.82 378.13L1477.72 404.63L1477.72 457.63L1431.82 484.13L1385.92 457.63L1385.92 404.63zM1385.92 457.63L1431.82 484.13L1431.82 537.13L1385.92 563.63L1340.02 537.13L1340.02 484.13zM1431.82 855.13L1477.72 881.63L1477.72 934.63L1431.82 961.13L1385.92 934.63L1385.92 881.63z' stroke='rgba(255%2c 255%2c 255%2c 0.5)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1015'%3e%3crect width='1440' height='1000' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
    color: ${({ theme }) => theme.textColor};
}




.carousel-caption {
    h1 { color:${({ theme }) => theme.carouselSlideTitleColor};     }
    p { color:${({ theme }) => theme.carouselSlideCaptionColor}; }
}


.ABrief {
    background-color:${({ theme }) => theme.verylightgray}; 
    color:${({ theme }) => theme.ABriefTextColor};
}
.ABrief h3, .ABrief .title {border-color: ${({ theme }) =>
  theme.ABriefTitleBorderColor}; }

  .ABrief h3::before, .ABrief .title::before {border-color: ${({ theme }) =>
    theme.ABriefTitleBorderColor}; }



// .ABriefAbout {
//     background: rgb(225,242,253);
//     background: linear-gradient(90deg, rgba(225,242,253,1) 0%, rgba(255,255,255,1) 100%);
//     background-color:${({ theme }) => theme.ABriefAboutBg}; 
//     color:${({ theme }) => theme.ABriefAboutTextColor};
// }

// .ABriefAbout h3, .ABriefAbout .title { border-color: ${({ theme }) => theme.ABriefAboutTitleBorderColor}; }

// .ABriefAbout h3::before, .ABriefAbout .title::before { border-color: ${({ theme}) => theme.ABriefAboutTitleBorderColor}; }


.homeServices {
    color:${({ theme }) => theme.secondaryColor}; 
    h2 {
        color:${({ theme }) => theme.secondaryColor}; 
        border-color: ${({ theme }) => theme.primaryColor}; 
    }

    h3 {
        color:${({ theme }) => theme.secondaryColor}; 
    }

    a.btn {
        background-color:${({ theme }) => theme.primaryColor};
    }

    a.btn:hover {
        background-color:${({ theme }) => theme.secondaryColor};
    }
}

.btn {
    border-radius: 0.375rem !important;
    transition: all .35s;
    padding: 6px 12px !important;

    // &:hover svg { transform: rotate(-45deg);}
    &:hover {
      letter-spacing: .1rem;
    }
    &:hover svg { 
      transform: translateX(10px);
    }

    @media (max-width: 480px) {
      width: 100%;
    }
}
.btn-primary {
    background-color:${({ theme }) => theme.secondaryColor}; 
    color:${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.secondaryColor} !important; 

}
.btn-primary:hover {
    background-color:${({ theme }) => theme.primaryColor}; 
    color:${({ theme }) => theme.secondaryColor};
    border: 1px solid ${({ theme }) => theme.secondaryColor} !important; 
}

.btn-secondary {
    background-color:${({ theme }) => theme.secondaryColor}; 
    color:${({ theme }) => theme.white};
}

.btn-secondary:hover {
    background-color:${({ theme }) => theme.primaryColor}; 
    border: 1px solid ${({ theme }) => theme.secondaryColor} !important;
    color:${({ theme }) => theme.secondaryColor};
}

.btn-outline {
    border: 1px solid ${({ theme }) => theme.secondaryColor} !important; 
    background-color:${({ theme }) => theme.primaryColor}; 
    color:${({ theme }) => theme.secondaryColor}; 
}

.btn-outline:hover { 
    border: 1px solid ${({ theme }) => theme.primaryColor} !important; 
    color:${({ theme }) => theme.secondaryColor};
}

.btn-more {
  border: 1px solid ${({ theme }) => theme.secondaryColor} !important; 
  color:${({ theme }) => theme.secondaryColor};
}
.btn-more:hover {
  background-color:${({ theme }) => theme.primaryColor}; 
  border: 1px solid ${({ theme }) => theme.secondaryColor} !important; 
  color:${({ theme }) => theme.secondaryColor};
}

.moreLink {
  color:${({ theme }) => theme.secondaryColor};
  font-size: .9rem
}

.moreLink:hover {
  color:${({ theme }) => theme.gray444};
}

.homeCareers {
    background-color:${({ theme }) => theme.teritoryColor};
    background-image:url(${careerBgImg});
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    div, p {
        text-align: center !important;
    }

    .briefIntro {
        padding-left: 0 !important;
        padding-bottom: 0 !important;
        
    }

    @media (max-width: 991px) {
    
        .briefIntro {
            padding-left: 1rem !important;
            padding-bottom: 1rem !important;
        }
    }
}

// Testimonial Component Styles



// End of Testimonial Component Styles //

.testimonialList img{
    width: 120px;
    height: 120px;
    box-shadow: 0 5px 5px ${({ theme }) => theme.teritoryColor};
}
.testimonialList:last-child {
    border: none !important
}

.lineClamp {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
.lc1 {-webkit-line-clamp: 1;}
.lc2 {-webkit-line-clamp: 2;}
.lc3 {-webkit-line-clamp: 3;}
.lc4 {-webkit-line-clamp: 4;}
.lc5 {-webkit-line-clamp: 5;}

.cursorPointer {
  cursor: pointer
}

.pageTitle {
  color: ${({ theme }) => theme.pageTitleColor};
}



.newsModel {
        position: fixed;
        z-index: 999999;
        top: 0px;
        bottom: 0px;
        left: 0px;
        // width: 500px;
        height: 100%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .newsModel img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        object-position: 0%;
      }
      
      .newsModalWrapper {
        width: 70%;
        height: 90%;
        margin: auto;
        border-radius: 10px;
        overflow: hidden;
      }
      
      .newsModalWrapper .newsDetails {
        max-height: 95%;
        overflow-y: auto;
      }
      
      @media (max-width: 768px) {
        .newsModalWrapper {
          width: 100%;
        }
      
        .newsModalWrapper .newsDetails {
          max-height: 300px;
        }
    }
    .error {
      color: ${({ theme }) => theme.error};
      text-align: center;
      margin: 0.5rem 0
    }


    .page-link {
      color: ${({ theme }) => theme.secondaryColor} !important;
    }

    .active>.page-link, .page-link.active {
      background-color: ${({ theme }) => theme.secondaryColor} !important; 
      color: ${({ theme }) => theme.white} !important;
      border-color: ${({ theme }) => theme.primaryColor} !important;
    }

    .deleteSection {
      position: absolute;
      top: 55px;
      right: 0px;
      z-index: 999;
      cursor: pointer;
      margin-top: 5px;
      width: auto !important;
      border: 2px dashed rgb(255, 193, 7);
      background-color: ${({ theme }) => theme.white};
      padding: 5px 12px;
    }

    .editIcon {
      right: 0px;
      padding: 0 !important;
    }

    .mt-6 {
      margin-top: 6rem;
    }

    .mt-7 {
      margin-top: 7rem;
    }

    .mt-8 {
      margin-top: 8rem;
    }

    .mt-9 {
      margin-top: 9rem;
    }

    .mt-10 {
      margin-top: 10rem;
    }

    .mt-11 {
      margin-top: 11rem;
    }

    .mt-12 {
      margin-top: 12rem;
    }

    input,
    textarea, select {
      background-color: ${({theme}) => theme.white};
      border: 1px solid ${({theme}) => theme.secondaryColor} !important;
      padding: 12px 10px;
    }
    input[type="checkbox"], input[type="radio"] {
      padding: 0;
      margin: 0;
    }

    .scrollTop {
      background-color: ${({theme}) => theme.secondaryColor};
    }
`;
