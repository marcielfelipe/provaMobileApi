const express = require ('express');


module.exports = {
    CalculoCredito(req,res) {
        let{
            Nome,
            Cpf,
            DataNascimento,
            SalarioBruto,
            QuantidadeDependentes,
            Empregado,
            TempoEmpregoAtual,
            RestricaoSerasa

        } = req.body;

        var Data = DataNascimento.split('-');
        

        console.log(Data);
        SalarioBruto = parseFloat(SalarioBruto);
        QuantidadeDependentes = parseInt(QuantidadeDependentes);
        TempoEmpregoAtual = parseInt(TempoEmpregoAtual);

        var ValorLimite = 0;

        function idade(ano_aniversario, mes_aniversario, dia_aniversario) {
            var d = new Date,
                ano_atual = d.getFullYear(),
                mes_atual = d.getMonth() + 1,
                dia_atual = d.getDate(),
        
                ano_aniversario = +ano_aniversario,
                mes_aniversario = +mes_aniversario,
                dia_aniversario = +dia_aniversario,
        
                quantos_anos = ano_atual - ano_aniversario;
        
            if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
                quantos_anos--;
            }
        
            return quantos_anos < 0 ? 0 : quantos_anos;
        }
    
        
        idade = idade(Data[2],Data[1],Data[0]);
        //console.log(idade);

        if(idade <= 18){//1
            return res.status(200).json({
                message:"Limite de cŕedito não disponível.",
                Cliente:Nome,
                CPF:Cpf,
                valorLimite:`R$ ${ValorLimite}`
            });
        };

        if(RestricaoSerasa=="S"& Empregado=="N"){//2
            return res.status(200).json({
                message:"Limite de Crédido não disponível.",
                Cliente:Nome,
                CPF:Cpf,
                valorLimite:`R$ ${ValorLimite}`
            });
        };
        if(RestricaoSerasa=="S"& Empregado=="S" & TempoEmpregoAtual<6){//3
            return res.status(200).json({
                message:"Limite de Crédido não disponível.",
                Cliente:Nome,
                CPF:Cpf,
                valorLimite:`R$ ${ValorLimite}`
            });
        };
        if(RestricaoSerasa=="S"& Empregado=="S" & TempoEmpregoAtual>=6 & TempoEmpregoAtual<12){//4
            ValorLimite= SalarioBruto  *0.1;

            return res.status(200).json({
                message:"Limite 10% do salário bruto disponível.",
                Cliente:Nome,
                CPF:Cpf,
                valorLimite:`R$ ${ValorLimite}`
            });
        };
        if(RestricaoSerasa=="S"& Empregado=="S" & TempoEmpregoAtual>=12){//5
            ValorLimite= SalarioBruto * 0.2;

            return res.status(200).json({
                message:"Limite 20% do salário bruto disponível.",
                Cliente:Nome,
                CPF:Cpf,
                valorLimite:`R$ ${ValorLimite}`
            });
        };
        if(RestricaoSerasa=="N"& Empregado=="N"){//6
            return res.status(200).json({
                message:"Limite de crédito não disponível.",
                Cliente:Nome,
                CPF:Cpf,
                valorLimite:`R$ ${ValorLimite}`
            });
        };
        if(RestricaoSerasa=="N"& Empregado=="S" & TempoEmpregoAtual<6){//7
            ValorLimite=SalarioBruto *0.1;
            return res.status(200).json({
                message:"Limite 10% do salário bruto disponível.",
                Cliente:Nome,
                CPF:Cpf,
                valorLimite:`R$ ${ValorLimite}`
            });
        };
        if(RestricaoSerasa=="N"& Empregado=="S" & TempoEmpregoAtual>=6 & TempoEmpregoAtual<12){//8
            ValorLimite = SalarioBruto * 0.2;

            return res.status(200).json({
                message:"Limite 20% do salário bruto disponível.",
                Cliente:Nome,
                CPF:Cpf,
                valorLimite:`R$ ${ValorLimite}`
            });
        };
        if(RestricaoSerasa=="N"& Empregado=="S" & TempoEmpregoAtual>12){//9
            ValorLimite = SalarioBruto * 0.3;

            return res.status(200).json({
                message:"Limite 30% do salário bruto disponível.",
                Cliente:Nome,
                CPF:Cpf,
                valorLimite:`R$ ${ValorLimite}`
            });
        };
        
    }
}