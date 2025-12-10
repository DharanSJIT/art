import React, { useState, useEffect } from "react";
import {
  Search,
  Star,
  MapPin,
  Clock,
  Users,
  Filter,
  MessageCircle,
  Sparkles,
  Award,
  TrendingUp,
  Globe,
  Handshake,
} from "lucide-react";
import collaborationImage from "../../assets/colloboration_image.png";

const CollaborationTab = () => {
  const [collaborators, setCollaborators] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setIsLoading(true);
        const { collection, getDocs } = await import("firebase/firestore");
        const { db } = await import("../../firebase");
        const sellersSnapshot = await getDocs(collection(db, "sellers"));
        const skillsList = new Set();

        const sellersData = sellersSnapshot.docs.map((doc) => {
          const skill = doc.data().productType || "Artisan";
          skillsList.add(skill);

          return {
            id: doc.id,
            name: doc.data().name || "Unknown",
            skill: skill,
            rating: Math.random() * 1 + 4, // 4.0 - 5.0
            location:
              `${doc.data().city || ""}, ${doc.data().state || ""}`
                .trim()
                .replace(/^,\s*|,\s*$/g, "") || "India",
            experience: doc.data().experience || "N/A",
            completedOrders: Math.floor(Math.random() * 100) + 20,
            isOnline: Math.random() > 0.3,
            image: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              doc.data().name || "User"
            )}&background=f5f5f5&color=333&bold=true&size=100`,
          };
        });

        setCollaborators(sellersData);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch sellers:", error);
        setIsLoading(false);
      }
    };
    fetchSellers();
  }, []);

  const uniqueSkills = Array.from(
    new Set(collaborators.map((c) => c.skill))
  ).slice(0, 6);

  const filteredCollaborators = collaborators.filter((collab) => {
    const matchesSearch =
      collab.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collab.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill =
      selectedSkill === "all" || collab.skill === selectedSkill;
    return matchesSearch && matchesSkill;
  });

  const getSkillColor = (skill) => {
    const colors = {
      Pottery: "bg-orange-50 text-orange-700 border-orange-200",
      Textiles: "bg-blue-50 text-blue-700 border-blue-200",
      Jewelry: "bg-purple-50 text-purple-700 border-purple-200",
      Woodwork: "bg-amber-50 text-amber-700 border-amber-200",
      Metalwork: "bg-gray-50 text-gray-700 border-gray-200",
      Painting: "bg-red-50 text-red-700 border-red-200",
      Sculpture: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
    return colors[skill] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="relative rounded-2xl shadow-soft border border-gray-100 overflow-hidden bg-white">
        <div className="absolute inset-0">
          <img src={collaborationImage} alt="Collaboration" className="w-full h-auto object-contain opacity-20" />
        </div>
        <div className="relative p-8">
          <div className="w-full">
            <h1 className="text-3xl font-bold text-gray-900">
              Artisan Network
            </h1>
            <p className="text-gray-600 mt-2">
              Connect with skilled artisans and build meaningful collaborations
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search artisans by name or skill..."
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 bg-gray-50 text-gray-900 placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <span className="text-sm text-gray-500">
                  {filteredCollaborators.length} results
                </span>
              </div>
            </div>
          </div>

          {/* Skill Filter */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Filter className="w-5 h-5 text-gray-400" />
            </div>
            <select
              className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 bg-gray-50 text-gray-900 appearance-none"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
            >
              <option value="all">All Skills</option>
              {uniqueSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Skill Tags */}
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={() => setSelectedSkill("all")}
            className={`px-4 py-2 rounded-lg border transition-all ${
              selectedSkill === "all"
                ? "bg-orange-50 text-orange-700 border-orange-300 font-semibold"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
            }`}
          >
            All Artisans
          </button>
          {uniqueSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(skill)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                selectedSkill === skill
                  ? "font-semibold border-2 " + getSkillColor(skill)
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCollaborators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCollaborators.map((collaborator) => (
              <div
                key={collaborator.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-gentle hover:border-orange-200 transition-all duration-300 group"
              >
                {/* Profile Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={collaborator.image}
                        alt={collaborator.name}
                        className="w-16 h-16 rounded-full border-2 border-white shadow-sm"
                      />
                      {collaborator.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-orange-700 transition-colors">
                        {collaborator.name}
                      </h3>
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium mt-2 ${getSkillColor(
                          collaborator.skill
                        )}`}
                      >
                        {collaborator.skill}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                      <span className="text-sm font-semibold text-gray-900 ml-1">
                        {collaborator.rating.toFixed(1)}
                      </span>
                    </div>
                    {/* <span className="text-xs text-gray-500 mt-1">{collaborator.completedOrders} orders</span> */}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                    <span className="text-sm">{collaborator.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                    <span className="text-sm">
                      {collaborator.experience} experience
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Award className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                    <span className="text-sm">
                      {collaborator.rating >= 4.7
                        ? "Top Rated"
                        : "Verified Artisan"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {/* <button className="flex-1 py-3 px-4 bg-white text-orange-600 rounded-xl border border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300 font-semibold flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </button> */}
                  <button className="flex-1 py-3 px-4 bg-orange-400 text-white rounded-xl hover:bg-orange-700 transition-all duration-300 font-semibold hover:shadow-md">
                    Collaborate
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No artisans found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search or filter to find skilled artisans for
              your collaboration needs.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedSkill("all");
              }}
              className="mt-6 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-semibold inline-flex items-center gap-2"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborationTab;
