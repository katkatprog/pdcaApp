import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CycleCard from "./CycleCard";
import Layout from "../../components/layout/Layout";
import { CycleIfc } from "../../interfaces/cycle.interface";
import Header from "./Header";

const Trash = () => {
  const [cycles, setCycles] = useState<CycleIfc[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "http://localhost:3001/cycles/trashed?userId=1",
      );
      setCycles(response.data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <Layout>
        <Header></Header>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "50px",
            }}
          >
            <FontAwesomeIcon
              icon={faCircleNotch}
              spin
              style={{ fontSize: "50px" }}
            />
          </div>
        ) : (
          cycles.map((ele) => (
            <div key={ele.id}>
              <CycleCard element={ele}></CycleCard>
            </div>
          ))
        )}
      </Layout>
    </>
  );
};

export default Trash;
