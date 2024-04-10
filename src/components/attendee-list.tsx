import React, { ChangeEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";

import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { MenuButton } from "./menu-button";
import { useMessage } from "../context/MessageContext";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

type Attendee = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
  code: string;
};

export const AttendeeList = () => {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());
    if(url.searchParams.has('search')){
        return url.searchParams.get('search') ?? ''
    }
    return ''
  });

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());
    if(url.searchParams.has('page')){
        return Number(url.searchParams.get('page'))
    }
    return 1
  });

  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [total, setTotal] = useState(0);

  const { showMessage } = useMessage();

  const totalPages = Math.ceil(total / 10); 

  useEffect(() => {
    fetchAttendees();
  }, [page, search]);

  function fetchAttendees() {
    const url = new URL('http://localhost:3333/events/4e198939-c40a-4b84-a02a-8f2ee8b75b66/attendees');

    url.searchParams.set('pageIndex', String(page - 1));

    if(search)
      url.searchParams.set('query', search);

    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setAttendees(data.attendees);
      setTotal(data.total);
    });
  }

  function handleCheckIn(attendee: Attendee){
    fetch(`http://localhost:3333/attendees/${attendee.code}/check-in`)
    .then(() => {
      fetchAttendees();
      showMessage('Check In do participante realizado com sucesso');
    })
  }

  function setCurrentSearch(search: string){
    const url = new URL(window.location.toString());

    url.searchParams.set('search', search);
    setSearch(search);

    window.history.pushState({}, '', url);
  }

  function setCurrentPage(page: number){
    const url = new URL(window.location.toString());

    url.searchParams.set('page', String(page));
    setPage(page);

    window.history.pushState({}, '', url);
  }

  function handleInputChange(ev: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(ev.target.value);
    setCurrentPage(1);
  }
  const goToNextPage = () => {
    setCurrentPage(page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(page - 1);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 bg-transparent rounded-lg flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm ring-0 focus:ring-0"
            placeholder="Buscar participante..."
            onChange={handleInputChange}
            value={search}
          />
        </div>
      </div>

      <Table className="w-full">
        <thead>
          <TableRow>
            <TableHeader style={{ width: 48 }}>
              <input
                type="checkbox"
                className="size-4 bg-black/20 border border-white/10 rounded focus:ring-black/10"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {attendees.map((attendee) => (
            <TableRow hover key={attendee.id}>
              <TableCell>
                <input
                  type="checkbox"
                  className="size--4 bg-black/20 border border-white/10 rounded"
                />
              </TableCell>
              <TableCell>{attendee.code}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">
                    {attendee.name}
                  </span>
                  <span>{attendee.email}</span>
                </div>
              </TableCell>
              <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
              <TableCell>
                {!attendee.checkedInAt ? (
                  <span className="text-zinc-500">Não fez check-in</span>
                ) : (
                  dayjs().to(attendee.checkedInAt)
                )}
              </TableCell>
              <TableCell>
                <MenuButton 
                  actions={[
                    {
                      title: "Check In",
                      action: ()  => handleCheckIn(attendee),
                      disabled: !!attendee.checkedInAt
                    }
                  ]}
                >
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>                  
                </MenuButton>                               

              </TableCell>
            </TableRow>
          ))}
        </tbody>
        <tfoot>
          <TableRow>
            <TableCell colSpan={3}>
              Mostrando {attendees.length} de {total} itens
            </TableCell>
            <TableCell colSpan={3} align="right">
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de {totalPages}
                </span>
                <div className="flex gap-1.5">
                  <IconButton disabled={page === 1} onClick={goToFirstPage}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton disabled={page === 1} onClick={goToPreviousPage}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    disabled={page === totalPages}
                    onClick={goToNextPage}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    disabled={page === totalPages}
                    onClick={goToLastPage}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </div>
  );
};
