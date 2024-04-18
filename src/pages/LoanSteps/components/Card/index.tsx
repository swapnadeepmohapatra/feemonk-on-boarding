import React from "react";
import clock from '../../../../images/icons/clock.svg'

interface LoanStepCardProps {
  title?: string;
  description?: string;
  image?: string;
  tiime?:string;
}

function LoanStepCard({ title, description, image,tiime }: LoanStepCardProps) {
  return (
    <div
      style={{
        marginTop: "1rem",
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        alignItems: "center",
        marginBottom:"2rem"
      }}
    >
      <img
        src={image}
        alt=""
        style={{
          width: "2.7rem",
          height: "2.7rem",
          borderRadius: "50%",
          backgroundColor: "#F4E5DD",
        }}
        
      />
      <div style={{}}>
        <div style={{display:'flex',alignItems:'center',flexDirection: 'row',}}>
        <p
          style={{
            fontSize: "1.3rem",
            fontWeight: "bold",
            marginRight:'1rem'
          }}
        >
          {title}
         
        
        </p>
        <div  style={{
            display:'flex',justifyContent:'space-around',width:'4rem', padding:'4px',alignItems:'center',borderRadius:'1rem',backgroundColor:'#FFDFE1',
          }}>
         <img style={{width:'14px',}} src={clock}/> <span style={{fontSize: "0.9rem",
            color:'#d32028',
           
            }}>{tiime}</span>
          </div>
        </div>
      
        <p
          style={{
            fontSize: "0.8rem",
            fontWeight: "normal",
            color: "#737373",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default LoanStepCard;
