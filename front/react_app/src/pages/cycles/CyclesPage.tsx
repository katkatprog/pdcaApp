import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { CycleCard } from "./CycleCard";
import { Layout } from "../../components/Layout";
import { Header } from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setCycles } from "../../redux/cyclesSlice";
import { hideMenu } from "../../redux/menuSlice";
import { Cycle } from "@prisma/client";

export const CyclesPage = () => {
  const cyclesState = useSelector((state: RootState) => state.cycles.value);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      dispatch(hideMenu());
      const data: Cycle[] = await (await axios.get(`/api/cycles/${1}`)).data;
      dispatch(setCycles(data));
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <Layout>
        <Header></Header>
        {loading ? (
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
          cyclesState.map((ele) => (
            <CycleCard key={ele.id} element={ele}></CycleCard>
          ))
        )}
      </Layout>
    </>
  );
};
