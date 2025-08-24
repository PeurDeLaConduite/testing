"use client";
import dynamic from "next/dynamic";
import TrafficCone from "../../src/components/3d/TrafficCone";

const Cone = ({ title }) => {
    return (
        <div
            style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div className="f">
                <h1>{title}</h1>
                <p>Cette page est en construction</p>
            </div>
            <TrafficCone />
        </div>
    );
};
export default dynamic(() => Promise.resolve(Cone), {
    ssr: false,
});
