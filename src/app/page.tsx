//components
import Hero from 'src/components/layout/Hero';
import HomeMenu from 'src/components/layout/HomeMenu';
import SectionHeaders from 'src/components/layout/SectionHeaders';

const Home = () => {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders subHeader={'Our story'} mainHeader={'About us'} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            The food delivery shop application is a cutting-edge solution
            designed to revolutionize the way customers experience food delivery
            services. This user-friendly mobile application seamlessly connects
            hungry users with a plethora of local restaurants, offering a
            diverse range of cuisines
          </p>
          <p>
            With a sleek and intuitive interface, users can easily browse
            through a curated selection of restaurants, explore menus, and place
            orders with just a few taps.
          </p>
          <p>
            This application aims to enhance convenience, streamline the
            ordering process, and provide a delightful experience for both
            customers and restaurant partners.
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:+46738123123"
          >
            +0702 465 814
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
