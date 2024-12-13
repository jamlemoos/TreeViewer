import React from "react";
import Button from "../components/Button";
import { CompanyIcon } from "../assets/companyIcon";

interface Unit {
  id: string;
  name: string;
  isActive: boolean;
}

interface HeaderProps {
  units: Unit[];
  onUnitClick: (unitId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ units, onUnitClick }) => {
  return (
    <header className="flex flex-row items-center justify-between p-4 text-white bg-headerBg">
      <div className="flex items-center">
        <img
          src="/LOGO_TRACTIAN.svg"
          alt="Tractian Logo"
          className="object-contain h-6"
        />
      </div>
      <nav className="flex gap-2">
        {units.map((unit) => (
          <Button
            key={unit.id}
            className={`${
              unit.isActive
                ? "bg-buttonHover"
                : "bg-buttonColor hover:bg-buttonHover"
            } text-white text-sm`}
            icon={<CompanyIcon />}
            onClick={() => onUnitClick(unit.id)}
          >
            {unit.name}
          </Button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
