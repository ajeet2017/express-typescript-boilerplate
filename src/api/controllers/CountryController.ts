import express, { Request, Response } from 'express';
import axios from 'axios';
import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put, Req
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

interface Country {
    name: string;
    currency: string;
  }

@Authorized()
@JsonController('/countries')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class CountryController{

  @Get()
  async getCountries() {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = response.data.map((country: any) => ({
      name: country.name.common,
      currency: country.currency ? country.currency[0] : null,
    }));
    return countries;
  }

}
