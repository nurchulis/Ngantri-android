
import React from 'react'
import {
  Svg,
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Text,
  Use,
  Defs,
  Stop
} from 'react-native-svg'

export default function Logo(props) {
  return (
    <Svg height="176.919" id="hand" width="196.603" viewBox="0 0 196.603 176.919">
    	<Defs>
        <LinearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <Stop offset="0" stop-color="#f3fcff"/>
          <Stop offset="1" stop-color="#a5dcff"/>
        </LinearGradient>
        <filter id="Path_530" x="102.049" y="76.602" width="94.554" height="68.775" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"/>
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feFlood flood-opacity="0.161"/>
          <feComposite operator="in" in2="blur"/>
          <feComposite in="SourceGraphic"/>
        </filter>
        <filter id="Path_526" x="27.049" y="76.824" width="76.106" height="68.258" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"/>
          <feGaussianBlur stdDeviation="3" result="blur-2"/>
          <feFlood flood-opacity="0.161"/>
          <feComposite operator="in" in2="blur-2"/>
          <feComposite in="SourceGraphic"/>
        </filter>
        <filter id="Path_528" x="69" y="17" width="69" height="72" filterUnits="userSpaceOnUse">
          <feOffset dy="3" input="SourceAlpha"/>
          <feGaussianBlur stdDeviation="3" result="blur-3"/>
          <feFlood flood-opacity="0.161"/>
          <feComposite operator="in" in2="blur-3"/>
          <feComposite in="SourceGraphic"/>
        </filter> 
      </Defs>
    	<Path id="Path_525" d="M41.385,68.4C25,77.506,10.145,88.1,2.906,102.356-7.821,123.472,12.732,149.99,38.689,153.1c13.985,1.676,38.557-6.372,45.918-3.11,19.69,8.723,15.5,17.515,48.074,26.1,26.772,7.06,66.634-31.832,51.021-91.977-3.307-12.742-11.009-28.079-20.062-42.607-16.077-25.8-57.783-52.311-85.7-37S57.767,59.293,41.385,68.4Z" fill="url(#linear-gradient)" opacity="0.759" data-name="Path 525"/>
    	<G id="Group_46" data-name="Group 46">
    		<G id="Group_45" transform="translate(36.049 82.824)" data-name="Group 45">
    			<Rect height="50" id="Rectangle_1329" width="17" fill="#fc7272" transform="translate(58)" data-name="Rectangle 1329"/>
    			<G transform="matrix(1, 0, 0, 1, -36.05, -82.82)">
    				<Path id="Path_530-2" d="M0,0,71.959-.222s4.845,9.65,4.584,26.088-3.308,24.688-3.308,24.688L0,50Z" fill="#fff" transform="translate(111.05 82.82)" data-name="Path 530"/>
    			</G>
    			<G transform="matrix(1, 0, 0, 1, -36.05, -82.82)">
    				<Path id="Path_526-2" d="M48.316,1.745c-.123-.4-1.59-.768-2.063-.823C30.289-.934,14.646.362,10.011,1.745Q5.239,3.17,8.11,12.9q-4.834,3.534-5.084,5.6t3.654,6.185Q1.8,28.515,1.373,30.629t2.806,6.542Q-.087,42.058,0,44.523t4.646,5.718h41.12q2.582.182,2.971-1.614a19.445,19.445,0,0,1,1.1-3.482h8.262V5.833l-9.367.875A22.78,22.78,0,0,0,48.316,1.745Z" fill="#ffe0c0" fillRule="evenodd" transform="translate(36.05 82.82)" data-name="Path 526"/>
    			</G>
    			<G id="Group_44" transform="translate(47 9)" data-name="Group 44">
    				<Circle id="Ellipse_57" x="16" y="16" fill="#00d2ba" r="16" data-name="Ellipse 57"/>
    				<Circle id="Ellipse_58" x="13" y="13" fill="#fff" r="13" transform="translate(3 2.5)" data-name="Ellipse 58"/>
    			</G>
    			<Rect height="9" id="Rectangle_1331" width="2" fill="#fc7272" rx="1" transform="translate(62 13)" data-name="Rectangle 1331"/>
    			<Rect height="6" id="Rectangle_1332" width="2" fill="#fc7272" rx="1" transform="matrix(0.259, 0.966, -0.966, 0.259, 71.796, 21.742)" data-name="Rectangle 1332"/>
    			<Circle id="Ellipse_59" x="2" y="2" fill="#fc7272" r="2" transform="translate(61 23)" data-name="Ellipse 59"/>
    		</G>
    	</G>
    	<Path id="Path_527" d="M78,23h51l-1.491,40.764-17.354,1.218L103.119,77l-2.778-12.018H78Z" data-name="Path 527"/>
    	<G transform="matrix(1, 0, 0, 1, 0, 0)">
    		<Path id="Path_528-2" d="M78,23h51l-1.491,40.764-17.354,1.218L103.119,77l-2.778-12.018H78Z" fill="#fff" data-name="Path 528"/>
    	</G>
    	<Circle id="Ellipse_60" x="3.5" y="3.5" fill="#ff8b9d" r="3.5" transform="translate(101 52)" data-name="Ellipse 60"/>
    	<Path id="Path_529" d="M103,28h5l-.71,22H103Z" fill="#ff8b9d" fillRule="evenodd" data-name="Path 529"/>
    </Svg>
  );
}
