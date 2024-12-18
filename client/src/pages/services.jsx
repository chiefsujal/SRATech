import { useAuth } from "../store/auth";

export const Services = () => {
  const {services} = useAuth();

  if (!Array.isArray(services)) {
  return (
    <>
    <h1 className="heading">Services</h1>,
    <p>Loading services...</p>
    </>
); // Or handle the error gracefully
}
  
  return(
      <section className="section-services">
        <div className="container">
          <h1 className="main-heading">Services</h1>
        </div>
      
      

      <div className="container grid grid-three-cols">
{/* cards must be looped as equal to number of data */}
    {services.map((curElem,index)=>{
        const {price,description,provider,service} = curElem;
        return (
        <div className="card" key={index}>
              <div className="card-img">
                <img src="/images/images/design.png" alt="our services info" width="200" />
              </div>

              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{provider}</p>
                  <p>{price}</p>
                </div>
                <h2>{service}</h2>
                <p>{description}</p>
              </div>
            </div>
        );
      })
    }
      </div>
    </section>
      
   
  );
};

export default Services;
