import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateBidDto {

    @IsOptional()
    buyer: string;

    @IsNotEmpty()
    @IsString()
    product: string;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => SlotDetails)
    @IsArray()
    bid_slots: SlotDetails[];

    @IsOptional()
    total_price: number;
}

export class SlotDetails {
    @IsNotEmpty()
    @IsString()
    slot: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}

