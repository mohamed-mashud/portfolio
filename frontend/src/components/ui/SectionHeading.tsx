import Reveal from "./Reveal";

type Props = {
  index: string;
  command: string;
  title: string;
  blurb?: string;
};

export default function SectionHeading({
  index,
  command,
  title,
  blurb,
}: Props) {
  return (
    <Reveal className="mb-10 sm:mb-14">
      <div className="flex items-center gap-3 font-mono text-sm text-mint-400">
        <span className="text-bone-400">{index}</span>
        <span className="h-px w-8 bg-forest-500" />
        <span>
          <span className="text-mint-500">~/</span>
          {command}
        </span>
      </div>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-bone-100 sm:text-4xl">
        {title}
      </h2>
      {blurb && (
        <p className="mt-3 max-w-2xl text-base text-bone-300">{blurb}</p>
      )}
    </Reveal>
  );
}
