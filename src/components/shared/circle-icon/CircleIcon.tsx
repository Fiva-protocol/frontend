const CircleIcon = ({ iconPath }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex gap-1 w-8 h-8 rounded-full" style={{ background: 'var(--Dark-Grey, #232336)' }}>
        <img src={iconPath} alt="icon" />
      </div>
    </div>
  );
};

export default CircleIcon;
