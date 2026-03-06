"use client";
import {getFilteredJob} from "@/actions/job.action";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";
import {useEffect, useState} from "react";
import JobGrid from "./JobGrid";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {State} from "country-state-city";
import toast from "react-hot-toast";

const JobSearchForm = ({initialJobs, companies, user}) => {
  const [location, setLocation] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(initialJobs);

  useEffect(() => {
    const func = async () => {
      const {data} = await getFilteredJob({
        searchQuery,
        location,
        companyId,
      });

      setFilteredData(data);
    };

    func();
  }, [searchQuery, location, companyId]);

  //   ===================== Handler ======================
  const handleSearch = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const query = formData.get("search-query");
    setSearchQuery(query);
  };

  const handleClearFilter = () => {
    setSearchQuery("");
    setLocation("");
    setCompanyId("");
    setFilteredData(initialJobs);

    toast.success("Cleared Filters");
  };

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={handleSearch} className="flex gap-2 items-center">
        <Input
          type={"text"}
          placeholder="Search Job by Title"
          name={"search-query"}
          className={""}
        />

        <Button type={"submit"} className={"flex items-center"}>
          <Search /> Search
        </Button>
      </form>

      <div className="flex gap-3">
        {/* ---------------------- Select Location -------------------- */}

        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Location</SelectLabel>
              {State.getStatesOfCountry("BD").map(({name}) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* ---------------------- Select Company -------------------- */}
        <Select value={companyId} onValueChange={setCompanyId}>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Filter by company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Companies</SelectLabel>
              {companies.map((com) => {
                return (
                  <SelectItem key={com?._id} value={com?._id}>
                    {com?.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button variant="destructive" onClick={handleClearFilter}>
          Clear Filter
        </Button>
      </div>

      {/* ------------------ Job Grid ------------------ */}
      <JobGrid data={filteredData} user={user} />
    </div>
  );
};
export default JobSearchForm;
