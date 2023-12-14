"use client";

import _ from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const useQueryString = () => {
  const searchParams = useSearchParams()!;
  const pathname = usePathname();
  const router = useRouter();

  /** -- Get search params -- */
  const [queryObject, setQueryObject] = React.useState<{
    [key: string]: string;
  }>({});

  /** -- Update search param -- */
  const setQueryString = (queryObject: { [key: string]: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    _.forEach(queryObject, (value, key) => {
      console.log("key", key, value);
      params.set(key, value);
    });

    router.push(pathname + "?" + params.toString());
  };

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (params) {
      const newQueryObject: { [key: string]: any } = {};
      params.forEach((value, key) => {
        newQueryObject[key] = value;
      });

      if (_.keys(newQueryObject).length > 0) {
        setQueryObject({ ...newQueryObject });
      }
    }
  }, [searchParams]);

  return {
    queryObject,
    setQueryString,
  };
};

export default useQueryString;
