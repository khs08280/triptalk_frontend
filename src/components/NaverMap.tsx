import { useEffect, useRef } from "react";

declare global {
  interface Window {
    naver: any;
  }
}
interface NaverMapProps {
  mapx: string;
  mapy: string;
  title?: string;
  address?: string;
  category?: string;
}
const NaverMap = ({ mapx, mapy, title, address, category }: NaverMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null); //  `<div>` 요소에 대한 참조이므로 타입 명시
  const { naver } = window;

  const formattedMapX = mapx ? mapx.slice(0, 3) + "." + mapx.slice(3) : "";
  const formattedMapY = mapy ? mapy.slice(0, 2) + "." + mapy.slice(2) : "";

  useEffect(() => {
    // naver 객체가 로드되었는지, 그리고 mapRef.current가 존재하는지 확인
    if (!naver || !mapRef.current) {
      return;
    }

    const location = new naver.maps.LatLng(
      parseFloat(formattedMapY),
      parseFloat(formattedMapX),
    );

    const mapOptions: naver.maps.MapOptions = {
      // 타입 명시
      center: location,
      zoom: 14,
    };

    let map: naver.maps.Map | null = new naver.maps.Map(
      mapRef.current,
      mapOptions,
    );

    const marker = new naver.maps.Marker({
      position: location,
      map: map,
    });

    const contentString = `
      <div style="padding:10px;min-width:200px;line-height:150%;">
        <h4 style="margin-top:5px;">${title || "장소 이름"}</h4><br />
        ${address ? `<p>${address}</p>` : ""}
        <h2>${category || "카테고리 없음"}</h2>
      </div>
    `;

    // InfoWindow 생성
    const infowindow = new naver.maps.InfoWindow({
      content: contentString, //HTML 컨텐츠
      maxWidth: 300, // 최대 너비
      backgroundColor: "#eee",
      borderColor: "#2db400",
      borderWidth: 3,
      anchorSize: new naver.maps.Size(20, 15), // 꼬리 크기
      anchorSkew: true, //꼬리위치 true면 중앙, false면 정해진 위치
      anchorColor: "#2db400",
      pixelOffset: new naver.maps.Point(0, -10), //마커와 anchor의 간격
    });

    infowindow.open(map, marker);
    naver.maps.Event.addListener(marker, "click", function () {
      if (infowindow.getMap()) {
        infowindow.close();
      } else {
        infowindow.open(map, marker);
      }
    });

    return () => {
      if (map) {
        map.destroy();
        map = null;
      }
    };
  }, [naver, mapx, mapy, formattedMapX, formattedMapY]); // 의존성 배열에 naver, mapx, mapy, formattedMapX, formattedMapY 추가

  return (
    <div>
      <div id="map" ref={mapRef} style={{ width: "1000px", height: "550px" }} />
    </div>
  );
};
export default NaverMap;
