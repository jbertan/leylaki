interface Props {
  badgeName: string;
}

const SmallBadge = (props: Props) => {
  return <div className="small-badge">{props.badgeName}</div>;
};
export default SmallBadge;
