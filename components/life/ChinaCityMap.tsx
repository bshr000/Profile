"use client";

import { useState, type CSSProperties } from "react";
import { chinaCities, visitedCityCount } from "@/lib/life/chinaCities";
import { withBasePath } from "@/lib/site";
import styles from "./ChinaCityMap.module.css";

const mapBounds = {
  west: 73,
  east: 135,
  north: 54,
  south: 18,
};

function project(longitude: number, latitude: number) {
  const x = 11 + ((longitude - mapBounds.west) / (mapBounds.east - mapBounds.west)) * 78;
  const y = 6 + ((mapBounds.north - latitude) / (mapBounds.north - mapBounds.south)) * 88;

  return { x, y };
}

export function ChinaCityMap() {
  const [selectedId, setSelectedId] = useState("beijing");
  const selectedCity = chinaCities.find((city) => city.id === selectedId) ?? chinaCities[0];
  const outlineStyle = {
    "--map-outline": `url("${withBasePath("/images/life/places/china-outline.svg")}")`,
  } as CSSProperties;

  return (
    <section className={styles.exhibit} aria-labelledby="china-city-map-title">
      <header className={styles.header}>
        <h2 id="china-city-map-title">我的人生地图</h2>
        <p>去过的地方留下坐标，尚未抵达的地方继续留白。</p>
      </header>

      <div
        className={styles.mapCanvas}
        style={outlineStyle}
        role="group"
        aria-label="中国城市人生足迹地图"
      >
        <div className={styles.mapOutline} aria-hidden="true" />

        {chinaCities.map((city) => {
          const point = project(city.longitude, city.latitude);
          const cityStyle = {
            "--city-x": `${point.x}%`,
            "--city-y": `${point.y}%`,
          } as CSSProperties;
          const selected = city.id === selectedId;

          return (
            <button
              key={city.id}
              type="button"
              className={styles.city}
              style={cityStyle}
              data-visited={city.visited}
              data-selected={selected}
              data-label={city.labelPosition ?? "below"}
              aria-pressed={selected}
              aria-label={`${city.name}，${city.visited ? "已点亮" : "尚未点亮"}`}
              onClick={() => setSelectedId(city.id)}
            >
              <span className={styles.cityDot} aria-hidden="true" />
              <span className={styles.cityName}>{city.name}</span>
            </button>
          );
        })}
      </div>

      <article
        key={selectedCity.id}
        className={styles.cityDetails}
        aria-live="polite"
      >
        <div className={styles.cityIdentity}>
          <span className={styles.cityStatus}>
            {selectedCity.visited ? "已点亮" : "未来坐标"}
          </span>
          <div>
            <h3>{selectedCity.name}</h3>
            {selectedCity.province !== selectedCity.name && (
              <span>{selectedCity.province}</span>
            )}
          </div>
        </div>

        <div className={styles.cityStory}>
          <p>
            {selectedCity.story ?? "还没有抵达，暂时保留为地图上的一处空白。"}
          </p>
          <dl>
            <div>
              <dt>记忆类型</dt>
              <dd>{selectedCity.memoryType ?? "等待发生"}</dd>
            </div>
            <div>
              <dt>档案状态</dt>
              <dd>{selectedCity.visited ? "正在整理" : "尚未建立"}</dd>
            </div>
          </dl>
        </div>
      </article>

      <p className={styles.mapNote}>
        已点亮 {visitedCityCount} 座城市。选择节点，阅读一段城市记忆。
      </p>
    </section>
  );
}
