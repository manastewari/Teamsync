import React from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-16">
      <section className="text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to <span className="text-gradient">TeamSync</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Streamline your team management with our intuitive platform. Add, track, and
            collaborate with your team members effortlessly.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/add-member"
              className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              <span className="relative flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Add New Member
              </span>
            </Link>

            <Link
              to="/members"
              className="group px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              <span className="relative flex items-center gap-2">
                <Users className="h-5 w-5" />
                View All Members
              </span>
            </Link>
          </div>
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-300/20 to-teal-300/20 rounded-full blur-3xl -z-10"></div>
      </section>

      <section className="relative">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="text-gradient">Features</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: UserPlus,
              title: "Easy Member Addition",
              description: "Add new team members with detailed profiles and images in seconds."
            },
            {
              icon: Users,
              title: "Team Overview",
              description: "Get a comprehensive view of your entire team at a glance."
            },
            {
              icon: ChevronRight,
              title: "Detailed Profiles",
              description: "Access in-depth information about each team member instantly."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl hover-scale"
            >
              <div className="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-indigo-600 to-teal-500 flex items-center justify-center text-white">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="glass-card rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of teams already using TeamSync to manage their members effectively
          and boost collaboration.
        </p>
        <Link
          to="/add-member"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-teal-500 text-white rounded-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <UserPlus className="h-5 w-5" />
          <span>Add Your First Member</span>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;