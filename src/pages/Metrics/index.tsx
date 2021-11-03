import React, { useState, useEffect, useContext } from "react";
import * as Component from "./style";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { ScreenContext } from "../../context/ContextScreen";
import { IDataFromLocalStorage } from "../../components/Question";

export const Metrics = () => {
  const Screen = useContext(ScreenContext);

  const [LoadDataChart, setLoadDataChart] = useState(false);
  const [Under18s, setUnder18s] = useState(0);
  const [Unlicensed, setUnlicensed] = useState(0);
  const [FirstCar, setFirstCar] = useState(0);
  const [Targetable, setTargetable] = useState(0);
  const [TargetableFuel, setTargetableFuel] = useState(0);
  const [AverageCar, setAverageCar] = useState(0);

  const [OptionsChartData, setOptionsChartData] = useState<ApexOptions>({
    chart: {
      height: 350,
      type: "bar",
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: ["fwd", "I don't know"],
      position: "top",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
  });

  const [dataChart, setdataChart] = useState([
    {
      name: "",
      data: [0, 0],
    },
  ]);

  const SetDataChart = (): void => {
    setLoadDataChart(true);
    const data: IDataFromLocalStorage[] = JSON.parse(
      localStorage.getItem("QResults") as string
    ) as unknown as IDataFromLocalStorage[];

    let fwd = 0;
    let idk = 0;

    data.map((dados) => {
      dados.response.map((dados) => {
        if (dados.question == 5) {
          switch (dados.value) {
            case "fwd":
              fwd++;
              break;
            case "idk":
              idk++;
              break;
          }
        }
      });
    });

    dataChart[0].data = [fwd, idk];
    setTimeout(() => {
      setLoadDataChart(false);
    }, 10);
  };

  const under18 = () => {
    const data: IDataFromLocalStorage[] = JSON.parse(
      localStorage.getItem("QResults") as string
    ) as unknown as IDataFromLocalStorage[];
    let total = 0;
    data.map((dados) => {
      dados.response.map((dados) => {
        if (dados.question == 1 && Number(dados.value) < 18) {
          total++;
        }
      });
    });

    setUnder18s(total);
  };

  const unlicensed = () => {
    const data: IDataFromLocalStorage[] = JSON.parse(
      localStorage.getItem("QResults") as string
    ) as unknown as IDataFromLocalStorage[];
    let total = 0;
    data.map((dados) => {
      dados.response.map((dados) => {
        if (dados.question == 3 && dados.value === "no") {
          total++;
        }
      });
    });

    setUnlicensed(total);
  };

  const firstCar = () => {
    const data: IDataFromLocalStorage[] = JSON.parse(
      localStorage.getItem("QResults") as string
    ) as unknown as IDataFromLocalStorage[];
    let total = 0;
    let between18and25 = [] as unknown as [];

    data.map((sessions) => {
      sessions.response.map((dados) => {
        if (
          dados.question == 1 &&
          Number(dados.value) >= 18 &&
          Number(dados.value) <= 25
        ) {
          let obj: IDataFromLocalStorage;
          between18and25.push(sessions as never);
        }
      });
    });
    between18and25.map((dados: any) => {
      dados.response.map((dados: any) => {
        if (dados.question == 4 && dados.value == "yes") {
          total++;
        }
      });
    });

    setFirstCar(total);
  };

  const targetable = () => {
    const data: IDataFromLocalStorage[] = JSON.parse(
      localStorage.getItem("QResults") as string
    ) as unknown as IDataFromLocalStorage[];
    let total = 0;
    let between18and25 = [] as unknown as [];

    data.map((sessions) => {
      sessions.response.map((dados) => {
        if (
          dados.question == 1 &&
          Number(dados.value) >= 18 &&
          Number(dados.value) <= 25
        ) {
          let obj: IDataFromLocalStorage;
          between18and25.push(sessions as never);
        }
      });
    });
    between18and25.map((dados: any) => {
      dados.response.map((dados: any) => {
        if (dados.question == 3 && dados.value == "yes") {
          total++;
        }
      });
    });

    setTargetable(total);
  };

  const averageCar = () => {
    const data: IDataFromLocalStorage[] = JSON.parse(
      localStorage.getItem("QResults") as string
    ) as unknown as IDataFromLocalStorage[];
    let totalCars = 0;
    let totalFamilies = 0;
    data.map((dados) => {
      dados.response.map((dados) => {
        if (dados.question == 7 && Number(dados.value) > 0) {
          totalFamilies++;
          totalCars += Number(dados.value);
        }
      });
    });
    let total = totalCars / totalFamilies;

    setAverageCar(total);
  };
  useEffect(() => {
    SetDataChart();
    under18();
    unlicensed();
    firstCar();
    targetable();
    averageCar();
  }, []);

  const targetableFuelEmission = () => {
    const data: IDataFromLocalStorage[] = JSON.parse(
      localStorage.getItem("QResults") as string
    ) as unknown as IDataFromLocalStorage[];
    let total = 0;
    let between18and25 = [] as unknown as [];

    data.map((sessions) => {
      sessions.response.map((dados) => {
        if (
          dados.question == 1 &&
          Number(dados.value) >= 18 &&
          Number(dados.value) <= 25
        ) {
          let obj: IDataFromLocalStorage;
          between18and25.push(sessions as never);
        }
      });
    });
    let targetableClients = [] as unknown as [];

    between18and25.map((dadosBTW: any) => {
      dadosBTW.response.map((dados: any) => {
        if (dados.question == 3 && dados.value == "yes") {
          targetableClients.push(dadosBTW as never);
        }
      });
    });
    targetableClients.map((dadosCli: any) => {
      dadosCli.response.map((dados: any) => {
        if (dados.question == 6 && dados.value == "yes") {
          total++;
        }
      });
    });

    setTargetableFuel(total);
  };
  useEffect(() => {
    SetDataChart();
    under18();
    unlicensed();
    firstCar();
    targetable();
    targetableFuelEmission();
  }, []);

  return (
    <Component.ContainerMain>
      <div className="RowCard">
        <div className="Card">
          <div className="Header">
            Under <br />
            18s
          </div>
          <div className="Value">{Under18s}</div>
        </div>
        <div className="Card">
          <div className="Header">Unlicensed Drivers</div>
          <div className="Value">{Unlicensed}</div>
        </div>
        <div className="Card">
          <div className="Header">
            First Car <br />
            18-25s
          </div>
          <div className="Value">{FirstCar}</div>
        </div>
      </div>
      <div className="RowCard">
        <div className="Card">
          <div className="Header">
            Targetable <br />
            Clients
          </div>
          <div className="Value">{Targetable}</div>
        </div>
        <div className="Card">
          <div className="Header">
            Targetable <br />
            Fuel Emission
          </div>
          <div className="Value">{TargetableFuel}</div>
        </div>
        <div className="Card">
          <div className="Header">
            Average Car <br />
            Family
          </div>
          <div className="Value">{AverageCar}</div>
        </div>
      </div>
      <div className="Container">
        <div className="Header">
          <h1>Metrics by Drivetrain</h1>
        </div>
        <div className="SpaceChart">
          {LoadDataChart ? (
            "Carregando dados"
          ) : (
            <>
              <Chart options={OptionsChartData} series={dataChart} type="bar" />
            </>
          )}
        </div>
      </div>
    </Component.ContainerMain>
  );
};
