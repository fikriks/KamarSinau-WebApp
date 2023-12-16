import { WrapperAdmin } from "../../layout/admin";
import { useAuthUser } from "react-auth-kit";

const Dashboard = () => {
    const auth = useAuthUser();
    
    return (
       <WrapperAdmin>
          <div className="col-md-10">
          <div className="dasboard-right">
              <h1 className="text-dark">
              Halo, Selamat Datang {auth().name}
              </h1>
          </div>
          </div>
       </WrapperAdmin>
     );
};

export {Dashboard as AdminDashboard};
