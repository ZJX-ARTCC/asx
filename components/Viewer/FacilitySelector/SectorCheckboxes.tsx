'use client';
import React, {useEffect} from 'react';
import {SectorMappingWithConditions} from "@/components/Viewer/AirspaceViewer";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Checkbox, FormControlLabel, FormGroup, Stack, Typography} from "@mui/material";
import {getConditionChips} from "@/lib/chips";

export default function SectorCheckboxes({sectors}: { sectors: SectorMappingWithConditions[], }) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [activeSectors, setActiveSectors] = React.useState<SectorMappingWithConditions[]>([]);

    useEffect(() => {
        const activeSectorIds = searchParams.get('sectors')?.split(',') ?? [];
        const activeSectors = sectors.filter(sector => activeSectorIds.includes(sector.id));
        setActiveSectors(activeSectors);
    }, [sectors, searchParams]);

    const onAddSector = (sectorId: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        const activeSectorIds = newSearchParams.get('sectors')?.split(',') ?? [];
        newSearchParams.set('sectors', [...activeSectorIds, sectorId].join(','));
        router.push(`${pathname}?${newSearchParams.toString()}`);
    }

    const onRemoveSector = (sectorId: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        const activeSectorIds = newSearchParams.get('sectors')?.split(',') ?? [];
        newSearchParams.set('sectors', activeSectorIds.filter(id => id !== sectorId).join(','));
        router.push(`${pathname}?${newSearchParams.toString()}`);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;

        if (checked) {
            onAddSector(e.target.id);
        } else {
            onRemoveSector(e.target.id);
        }
    }

    return (
        <FormGroup>
            {sectors.map(sector => (
                <FormControlLabel key={sector.id}
                                  control={<Checkbox id={sector.id} checked={activeSectors.includes(sector)}
                                                     onChange={handleChange}/>} label={
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>{sector.name}</Typography>
                        {getConditionChips(sector.mappings.flatMap(mapping => mapping.airportCondition).filter((ac) => !!ac))}
                    </Stack>
                }/>
            ))}
        </FormGroup>
    );
}