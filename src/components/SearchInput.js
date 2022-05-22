import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({ label, placeholder, handleSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchQuery);
  };
  return (
    <form onSubmit={onSubmit}>
      <TextField
        label={label}
        value={searchQuery}
        placeholder={placeholder}
        onChange={(event) => setSearchQuery(event.target.value)}
        sx={{ width: 350 }}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                color="primary"
                arial-label="search by name"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default SearchInput;

<p>
  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt quas eos
  laudantium accusantium quae quibusdam fugiat reprehenderit iste dignissimos
  esse et nulla repellat, ullam excepturi, modi, delectus veritatis accusamus
  ipsum cupiditate est. Doloremque veniam eos consequuntur modi, provident
  temporibus unde dolorem voluptas eaque laudantium incidunt ipsa a praesentium
  aperiam. Et reiciendis deserunt voluptates rerum. Corrupti laborum earum
  reiciendis amet magni! Odio ad nam facere blanditiis cum adipisci quisquam qui
  iusto fugit voluptate ipsum provident debitis quaerat reiciendis modi atque
  praesentium est ullam at, autem molestias dolores aliquid culpa quo! At, animi
  eum rerum possimus officiis nam voluptates commodi aspernatur vel recusandae
  ad vitae, nesciunt adipisci laborum porro optio asperiores saepe minus esse
  sunt! Totam nulla animi, tenetur quisquam, alias optio, delectus facere
  exercitationem sint consectetur culpa omnis! Fuga veniam ipsa, accusamus
  itaque esse porro inventore sapiente quisquam tempore expedita eaque quas,
  voluptate possimus magnam! Nisi temporibus repellendus aspernatur molestias
  saepe.
</p>;
